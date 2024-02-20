import { useAcademicSemesterQuery } from "../../../redux/features/academicManagement/academicManagementApi";

const AcademicSemester = () => {
  const { data } = useAcademicSemesterQuery({});
  console.log(data, "academic semester");
  return (
    <div>
      <h1> this is AcademicSemester components </h1>
    </div>
  );
};

export default AcademicSemester;
