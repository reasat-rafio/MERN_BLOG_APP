import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../../utils/authSchema";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/Actions/authAction";

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function SignIn() {
   const classes = useStyles();

   // setting yup auth as useFormHook resolver
   const { handleSubmit, register, errors } = useForm({
      resolver: yupResolver(signinSchema),
   });

   // redux
   const dispatch = useDispatch();

   // on the form submit
   const onSubmit = (data) => {
      dispatch(loginUser(data));
   };

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign in
            </Typography>
            <form
               className={classes.form}
               noValidate
               onSubmit={handleSubmit(onSubmit)}
            >
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  inputRef={register}
               />
               {errors.email && (
                  <Typography variant="body2" color="secondary">
                     {errors.email.message}
                  </Typography>
               )}

               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputRef={register}
                  autoComplete="current-password"
               />
               <br />
               {errors.password && (
                  <Typography variant="body2" color="secondary">
                     {errors.password.message}
                  </Typography>
               )}
               <br />
               <FormControlLabel
                  control={
                     <Checkbox
                        inputRef={register}
                        defaultValue={false}
                        name="remember"
                        color="primary"
                     />
                  }
                  label="Remember me"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                     <Link href="/" variant="body2">
                        {"Don't have an account? Sign Up"}
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
}
