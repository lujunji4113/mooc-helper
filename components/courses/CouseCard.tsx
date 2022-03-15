import type { Course } from "../../pages/courses";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 250,
        m: 1,
      }}
    >
      <div>
        <CardMedia height={125} alt="" component="img" image={course.imgUrl} />
        <CardHeader title={course.name} />
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {course.schoolName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.currentTermId}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
