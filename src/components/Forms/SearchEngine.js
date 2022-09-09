import { Col, Row, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { services } from "../..";
import { useContext, useState } from "react";
import { ContextMainPage } from "../MainPage/MainPage";

const SearchEngine = ({ }) => {
  const contextMainPageValue = useContext(ContextMainPage);
  const [searchKeyword, setSearchKeyword] = useState("lyric"); // le mot clé a rechercher

  // Méthode pour récuprer les playlists
  const getPlaylists = () => {
    services.spotify
      .getMyPlaylists()
      .then((response) => {
        contextMainPageValue.setDisplay("playlists");
        contextMainPageValue.setCurrentPage(1);
        contextMainPageValue.setData(response.data);
        contextMainPageValue.setItems(response.data.items.slice(0, contextMainPageValue.paginationSize));
        contextMainPageValue.setlistItems(response.data.items);
      })
      .catch((error) => { console.log(error) });
  }

  // Méthode pour récuprer une liste d'album en fonction du mot clé saisie
  const searchAlbum = () => {
    services.spotify
      .searchAlbum(searchKeyword)
      .then((response) => {
        contextMainPageValue.setDisplay("albums");
        contextMainPageValue.setCurrentPage(1);
        contextMainPageValue.setData(response.data);
        contextMainPageValue.setItems(response.data.albums.items.slice(0, contextMainPageValue.paginationSize));
        contextMainPageValue.setlistItems(response.data.albums.items);
      })
      .catch((error) => { console.log(error) });
  }

  return (
    <>
      <Formik
        // Valeurs initiales
        initialValues={{
          keyword: ""
        }}

        // Vérification pour les champs
        validationSchema={() => Yup.object().shape({
          keyword: Yup.string().required("Veuillez saisir un mot clé")
        })}

        // Lors du submit
        onSubmit={async (values) => {
          contextMainPageValue.setItems([]);
          contextMainPageValue.setlistItems([]);
          searchAlbum();
        }}
      >
        {({ errors, touched, values, handleSubmit, handleChange, setFieldValue }) => (
          <Form>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Search albums</Form.Label>
                <Form.Control
                  name="keyword"
                  type="text"
                  placeholder="lyrics"
                  onChange={(e) => {
                    setFieldValue("keyword", e.target.value);
                    setSearchKeyword(e.target.value);
                  }}
                  value={values.keyword}
                  isInvalid={touched.keyword && !!errors.keyword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.keyword}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-info"
                  onClick={() => {
                    getPlaylists()
                  }}
                >Get all playlists</Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  variant="outline-info"
                  onClick={handleSubmit}
                >Search albums</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchEngine;
