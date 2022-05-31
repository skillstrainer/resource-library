import "./App.css";
import "./lib/styles.css";
import { CourseCard } from "./lib";
import MultiLangBody from "./lib/components/multi-lang/MultiLangBody";
import MultiLangField from "./lib/components/multi-lang/MultiLangField";

function App() {
  const courseData = {
    categoryName: "Management and Entrepreneurship",
    categoryId: 10,
    categoryImg: "",
    courseId: 45,
    shortName: "Office Assistant - RPL (MEP/Q0202)",
    displayName: "Office Assistant - RPL (MEP/Q0202)",
    description: "Office Assistant - RPL (MEP/Q0202)",
    courseImg:
      "https://lms.skillstrainer.in/moodle/pluginfile.php/64205/course/overviewfiles/OA.png",
    students_enrolled: "22,438",
    digitalContentDuration: "3",
    nsqf_lvl: "3",
    redirection_url:
      "https://lms.skillstrainer.in/moodle/course/view.php?id=105",
    cost: 499,
    discount: null,
    modules: [
      {
        id: 1181,
        name: "General",
        visible: 1,
        summary: "",
        summaryformat: 1,
        section: 0,
        hiddenbynumsections: 0,
        uservisible: true,
        modules: [],
      },
      {
        id: 1182,
        name: "Office Assistant - RPL",
        visible: 1,
        summary: "",
        summaryformat: 1,
        section: 1,
        hiddenbynumsections: 0,
        uservisible: true,
        modules: [
          {
            id: 1387,
            url: "https://lms.skillstrainer.in/moodle/mod/scorm/view.php?id=1387",
            name: "Office Assistant - RPL",
            instance: 1303,
            visible: 1,
            uservisible: true,
            visibleoncoursepage: 1,
            modicon:
              "https://lms.skillstrainer.in/moodle/theme/image.php/adaptable/scorm/1653284658/icon",
            modname: "scorm",
            modplural: "SCORM packages",
            availability: null,
            indent: 0,
            onclick: "",
            afterlink: null,
            customdata:
              '{"customcompletionrules":{"completionstatusrequired":null,"completionscorerequired":null,"completionstatusallscos":"0"}}',
            noviewlink: false,
            completion: 2,
            completiondata: {
              state: 0,
              timecompleted: 0,
              overrideby: null,
              valueused: false,
            },
          },
        ],
      },
    ],
    partners: [],
  };

  return (
    <div>
      <MultiLangBody _key={"user1"}>
        <li>
          Name: <MultiLangField name="name" />
        </li>
        <li>
          Age: <MultiLangField name="age" />
        </li>
      </MultiLangBody>
    </div>
  );
}

export default App;
