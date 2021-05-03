import { Grid } from "@material-ui/core";
import logo from "../../layout/logo.png";
import CustomCard from "../../components/CustomCard";
import message from "../../static/images/message.jpg";
import shedule from "../../static/images/shedule.jpg";

const Home = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={4}
    >
      <Grid item>
        <img
          src={logo}
          style={{ marginLeft: "auto", marginRight: "auto" }}
          alt="Logo"
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <CustomCard
              name={"Make an appointment"}
              content={
                "Choose a free date and apply for a visit to the dean's office."
              }
              img={shedule}
            />
          </Grid>
          <Grid item>
            <CustomCard
              name={"Write a message"}
              content={
                "Contact the staff at the dean's office. the employee will write back as soon as possible."
              }
              img={message}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
