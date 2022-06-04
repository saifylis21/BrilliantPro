import React from "react";
import { useState } from "react";
import classes from './Auth.module.css';
import { setGlobalState } from "../../state";

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import firebaseObj from "../../firebase";
import auth from '../../firebase2';

const { getFirestore, collection, onSnapshot, query, where } = require("firebase/firestore");
const { signInWithEmailAndPassword } = require("firebase/auth");

const Auth = (props) => {

    const [role, setRole] = useState("");

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },

        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        },
    });
    const [isLogin, setIsLogin] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedAuthForm = {
            ...authForm,
            [inputIdentifier]: {
                ...authForm[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[inputIdentifier].validation),
                touched: true
            }
        }

        let validForm = true;
        for (let inputIdentifier in updatedAuthForm) {
            validForm = updatedAuthForm[inputIdentifier].valid && validForm;
        }

        setFormIsValid(validForm);
        setAuthForm(updatedAuthForm);
    }

    let formElementsArray = [];

    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(!isLogin) {
            firebaseObj.createUserWithEmailAndPassword(firebaseObj.auth, authForm.email.value, authForm.password.value)
            .then(cred => {
                setGlobalState("isLoggedIn", true);
                setGlobalState("role", role);

                const db = firebaseObj.getFirestore();
                const colRef = firebaseObj.collection(db, "users");

                firebaseObj.addDoc(colRef, {
                    email: authForm.email.value,
                    password: authForm.password.value,
                    role: role,
                  })
                  .then(() => {
                      console.log("Document successfully written!");
                  })
                  .catch((error) => {
                      console.error("Error writing document: ", error);
                  });


                props.history.push('/');
            });
        } else {

            signInWithEmailAndPassword(auth, authForm.email.value, authForm.password.value)
            .then(cred => {
                console.log("successfully logged in!");

                    // init services (firestore)
                    const db = getFirestore();

                    // collection ref
                    const colRef = collection(db, "users");

                    const q = query(colRef, where("email", "==", authForm.email.value));

                    onSnapshot(q, (snapshot) => {
                        let users = [];
                        snapshot.docs.forEach((doc) => {
                            users.push({ ...doc.data(), id: doc.id })
                        })

                        console.log(users);
                        setGlobalState("role", users[0].role);
                        setGlobalState("isLoggedIn", true);
                        props.history.push('/');
                    })

            })
            .catch(err => {
                console.error("Error loging in:", err);
            })
        }

    }

    let form = (
        <form onSubmit={submitHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    shouldValidate={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                />
            ))}

            <Button disabled={!formIsValid}>{isLogin ? 'Log In' : 'Sign Up'}</Button>
        </form>
    );

    const onChangeValue = (event) => {
        setRole(event.target.value);
    }
    
    return (
        <div className={classes.Auth}>
            <h1>Log In Or Sign Up Into Your Account</h1>

            <div onChange={onChangeValue}>
                <input type="radio" value="Admin" name="role" /> Admin
                <input type="radio" value="User" name="role" /> User
            </div>

            {form}

            <Button clicked={switchAuthModeHandler} >
                {isLogin ? 'Create new account' : 'Login with existing account'}
            </Button>
        </div>
    );
};

export default Auth;