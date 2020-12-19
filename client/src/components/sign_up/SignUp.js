import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/authSchema";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/Actions/authAction";

// MUI makeStyles
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
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function SignUp() {
   const classes = useStyles();

   // setting yup auth as useFormHook resolver
   const { handleSubmit, register, errors } = useForm({
      resolver: yupResolver(signupSchema),
   });

   // redux dispatch
   const dispatch = useDispatch();
   // redux state
   // const state = useSelector((state) => state.auth);

   // on the form submit
   const onSubmit = (data) => {
      const { firstName, lastName, email, password } = data;
      const user = {
         firstName,
         username: `${firstName} ${lastName}`,
         email,
         password,
      };
      dispatch(registerUser(user));
   };

   return (
      <Container style={{ height: "92vh" }} component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign Up
            </Typography>
            <form
               className={classes.form}
               noValidate
               onSubmit={handleSubmit(onSubmit)}
            >
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        autoComplete="fname"
                        name="firstName"
                        inputRef={register}
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                     />

                     {/* {errors.firstName && (
                        <Typography variant="body2" color="secondary">
                           {errors.firstName.message}
                        </Typography>
                     )} */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        inputRef={register}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={register}
                     />
                     {errors.email && (
                        <Typography variant="body2" color="secondary">
                           {errors.email.message}
                        </Typography>
                     )}
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        inputRef={register}
                        id="password"
                        autoComplete="current-password"
                     />
                     {errors.password && (
                        <Typography variant="body2" color="secondary">
                           {errors.password.message}
                        </Typography>
                     )}
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Sign Up
               </Button>
               <Grid container justify="flex-end">
                  <Grid item>
                     <Link href="/signin" variant="body2">
                        Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
}
