import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../utils/authSchema";

function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {"Copyright © "}
         <Link color="inherit" href="#">
            Blogitica
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

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
   const { handleSubmit, register, errors } = useForm({
      resolver: yupResolver(authSchema),
   });
   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Register
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

                  {/* {errors.lastName && (
                     <Typography variant="body2" color="secondary">
                        {errors.lastName.message}
                     </Typography>
                  )} */}

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
         <Box mt={5}>
            <Copyright />
         </Box>
      </Container>
   );
}
