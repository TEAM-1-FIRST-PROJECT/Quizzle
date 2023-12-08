import { Routes, Route } from "react-router-dom";
import RegisterForm from "../../views/Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Settings from "../../views/Settings/Settings";
import Login from "../../views/Login/Login";
import PublicView from "../../views/PublicView/PublicView";
import SingleQuizView from "../../views/SingleQuizView/SingleQuizView";
import CreateQuiz from "../../views/CreateQuiz/CreateQuiz";
import About from "../../views/About/About";
import Contact from "../../views/Contact/Contact";
import AdminPanel from "../../views/AdminPanel/AdminPanel";
import QuizManagement from "../../views/AdminPanel/QuizManagement/QuizManagement";
import Students from "../../views/EducatorPanel/Students/Students";
import EducatorPanel from "../../views/EducatorPanel/EducatorPanel";
import QuizManage from "../../views/EducatorPanel/QuizManage/QuizManage";
import AssignedQuizzes from "../../views/AssignedQuizzes/AssignedQuizzes";
import NotFound from "../NotFound/NotFound";
import Categories from "../Categories/Categories";
import QuizListByCategory from "../Categories/QuizListByCategory/QuizListByCategory";
import AssignQuiz from "../../views/AssignQuiz/AssignQuiz";
import GroupDetails from "../../views/EducatorPanel/Group/GroupDetails";
import GroupsList from "../../views/EducatorPanel/Group/GroupsList";
import GroupsManagement from '../GroupsManagement/GroupsManagement';  
import UserProfileView from '../../views/UserProfileView/UserProfileView'
import QuizScoreboard from "../../views/QuizScoreboard/QuizScoreboard";
import SeeSummary from "../../views/Summary/Summary";
import UserAnswers from "../../views/UserAnswers/UserAnswers";
import GroupQuizzes from "../../views/EducatorPanel/Group/GroupQuizzes";
import SingleQuizScoreBoard from "../../views/SingleQuizScoreboard/SingleQuizScoreboard";
import ResetPassword from "../ResetPassword/ResetPassword";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfileView />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PublicView />} />
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/singleQuizView/:id" element={<SingleQuizView />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/quiz-management" element={<QuizManagement />} />
      <Route path="/students" element={<Students />} />
      <Route path="/educator" element={<EducatorPanel />} />
      <Route path="/quiz-manage" element={<QuizManage />} />
      <Route path="/assigned-quizzes" element={<AssignedQuizzes />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:category" element={<QuizListByCategory />} />
      <Route path="/assign-quiz/:id" element={<AssignQuiz />} />
      <Route path="/groups" element={<GroupsManagement />} />
      <Route path="/group/:groupId" element={<GroupDetails />} />
      <Route path="/groups-list" element={<GroupsList />} />
      <Route path="/summary/:id" element={<SeeSummary />} />
      <Route path="/quiz-scoreboard/:id" element={<QuizScoreboard />} />
      <Route path="/user-answers/:id" element={<UserAnswers />} />
      <Route path="/group-quizzes" element={<GroupQuizzes />} />
      <Route path="/singleQuizScoreboard/:id" element={<SingleQuizScoreBoard />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRouter;
