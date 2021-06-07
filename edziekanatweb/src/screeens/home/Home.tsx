import { Grid } from "@material-ui/core";
import logo from "../../layout/logo.png";
import CustomCard from "../../components/CustomCard";
import message from "../../static/images/message.jpg";
import shedule from "../../static/images/shedule.jpg";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors/authSelector";
import userRole from "../../common/constants/userRole";
import ChatBot from "react-simple-chatbot";

const Home = () => {
  const role = useSelector(userRoleSelector);

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
            <a href="/appointment">
              <CustomCard
                name={
                  role && role[0].toUpperCase() === userRole.Student
                    ? "Make an appointment"
                    : "Students reservations"
                }
                content={
                  role && role[0].toUpperCase() === userRole.Student
                    ? "Choose a free date and apply for a visit to the dean's office."
                    : ""
                }
                img={shedule}
              />
            </a>
          </Grid>
          <Grid item>
            <a href="/messenger">
              <CustomCard
                name={
                  role && role[0].toUpperCase() === userRole.Student
                    ? "Write a message"
                    : "Students messages"
                }
                content={
                  role && role[0].toUpperCase() === userRole.Student
                    ? "Contact the staff at the dean's office. the employee will write back as soon as possible."
                    : ""
                }
                img={message}
              />
            </a>
          </Grid>
          <Grid item>
            <div>
              <ChatBot
                steps={[
                  {
                    id: "0",
                    message: "Welcome to react chatbot!",
                    trigger: "1",
                  },
                  {
                    id: "1",
                    message: "Bye!",
                    end: true,
                  },
                ]}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
