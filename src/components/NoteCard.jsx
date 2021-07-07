import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";

import { yellow, green, pink, blue } from "@material-ui/core/colors";
import { DeleteOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
  return {
    Cavatar: {
      backgroundColor: (note) => {
        if (note.category == "Work") {
          return yellow[700];
        }
        if (note.category == "Reminders") {
          return blue[500];
        }
        if (note.category == "Todos") {
          return pink[500];
        }
        if (note.category == "Money") {
          return green[500];
        }
      },
    },
    avatar: {
      backgroundColor: "#f50057",
    },
  };
});

const NoteCard = ({ note, handleDelete }) => {
  const classes = useStyles(note);
  return (
    <>
      <Card elevation={3}>
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          avatar={
            <Avatar className={classes.Cavatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteCard;
