import React from "react";
import { Grid, Container } from "@material-ui/core";
import MediaCard from "../components/profileCard";

import ContentLoader, { Facebook } from "react-content-loader";

export default function ProfilePage(props) {
  const { data, loading } = props;
  const MyFacebookLoader = () => <Facebook />;

  return (
    <Container fixed>
      {loading ? (
        <MyFacebookLoader />
      ) : (
        <Grid container={true}>
          {data.map((person) => {
            return (
              <Grid
                key={person.id}
                item
                lg={6}
                md={6}
                xs={12}
                justify={"center"}
                align={"center"}
              >
                <MediaCard
                  data={person}
                  deleteData={props.deleteData}
                  updateData={props.updateData}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
