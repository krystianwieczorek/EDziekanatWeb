import { Grid } from "@material-ui/core";
import logo from "../../layout/logo.png";
import CustomCard from "../../components/CustomCard";
import message from "../../static/images/message.jpg";
import shedule from "../../static/images/shedule.jpg";
import { useSelector } from "react-redux";
import { userRoleSelector } from "../../store/selectors/authSelector";
import userRole from "../../common/constants/userRole";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const Home = () => {
  const role = useSelector(userRoleSelector);

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#3f50b5",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#3f50b5",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

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
            <div>
              <ThemeProvider theme={theme}>
                <ChatBot
                  steps={[
                    {
                      id: "1",
                      message: "o co chcesz zapytać?",
                      trigger: "2",
                    },
                    {
                      id: "2",
                      options: [
                        { value: 1, label: "Numer telefonu", trigger: "3" },
                        { value: 2, label: "email", trigger: "4" },
                        { value: 3, label: "Godziny przyjęć", trigger: "5" },
                      ],
                    },
                    {
                      id: "3",
                      message: "tel. (34) 325-05-61",
                      trigger: "2",
                    },
                    {
                      id: "4",
                      message: "dziekanat@wimii.pcz.pl",
                      trigger: "2",
                    },
                    {
                      id: "5",
                      message:
                        "Pn nieczynny Wt 1030 - 1430 Śr 1030 - 1430 Czw 1030 - 1430 Pt 1030 - 1430 Sb 800-1300 (tylko w czasie zjazdów na studiach niestacjonarnych)",
                      trigger: "2",
                    },
                  ]}
                />
              </ThemeProvider>
            </div>
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
