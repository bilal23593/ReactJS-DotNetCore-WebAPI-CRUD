import React,{useState,useEffect} from 'react'
import { Grid,Paper,TextField,withStyles, FormControl, MenuItem,InputLabel,Select,Button, FormHelperText } from '@material-ui/core';
import useForm from './useForm'
import {connect} from 'react-redux'
import * as actions from '../actions/dCandidate'
import {useToasts} from 'react-toast-notifications'

const styles = theme =>({
    root:{
    "& .MuiTextField-root" : {
        margin : theme.spacing(2),
        minWidth :  230,
    }},

    formControl:{
        margin : theme.spacing(2),
        minWidth :  230,
    },
    smMargin:{
        margin : theme.spacing(2)
    }
});

const initialValues ={
    fullNme:'',
    mobile:'',
    email:'',
    age:'',
    bloodGroup:'',
    address:''
};  

const DCandidateForm = ({classes,...props}) => {

    const {addToast} = useToasts()

    const validate = (fieldValues = values) =>{

        let temp={...errors}

        if('fullNme' in fieldValues)
            temp.fullNme = fieldValues.fullNme ? "" : "This field is required";
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required";
        if('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required";
        if('email' in fieldValues)
            temp.email =  (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid";

        setErrors({
            ...temp            
        }) 
        
        if(fieldValues == values)
                return Object.values(temp).every(x => x == "")

    }

    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialValues, validate,  props.setCurrentId);

    //Material UI select drop down
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){

            const onSuccess = () => {
                resetForm()
                addToast("Submitted Successfully", {appearance:'success'})
            }
            if(props.currentId == 0){
                props.createDcandidate(values, onSuccess)
            }
            else{
                props.updateDcandidate(props.currentId,values, onSuccess)
            }
            
        }
        
    }

    useEffect(
        () => {
            if(props.currentId !=0 ){
                setValues({
                    ...props.dCandidateList.find(x => x.id == props.currentId)
                })
                setErrors({})
            }
        }, [props.currentId]
    )

    return ( 
        <React.Fragment>
            <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs ={6}>
                        <TextField 
                            name="fullNme"
                            variant="outlined"
                            label="Full Name" 
                            value={values.fullNme}
                            onChange={handleInputChange}
                            {...(errors.fullNme && {error:true , helperText:errors.fullNme})}
                            />
                            <TextField 
                            name="email"
                            variant="outlined"
                            label="Email" 
                            value={values.email}
                            onChange={handleInputChange}
                            {...(errors.email && {error:true , helperText:errors.email})}
                            />
                            <FormControl variant="outlined" className={classes.formControl}
                            {...(errors.bloodGroup && {error:true})}
                            >
                                <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                                <Select
                                    name="bloodGroup"
                                    value={values.bloodGroup}
                                    onChange={handleInputChange}
                                    labelWidth={labelWidth}
                                >
                                    <MenuItem value="">Select Blood Group</MenuItem>
                                    <MenuItem value="A+">A +ve</MenuItem>
                                    <MenuItem value="A-">A -ve</MenuItem>
                                    <MenuItem value="B+">B +ve</MenuItem>
                                    <MenuItem value="B-">B -ve</MenuItem>
                                    <MenuItem value="AB+">AB +ve</MenuItem>
                                    <MenuItem value="O+">O +ve</MenuItem>
                                    <MenuItem value="O-">O -ve</MenuItem>
                                </Select>
                                {errors.bloodGroup &&  <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                            </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField 
                            name="mobile"
                            variant="outlined"
                            label="Mobile" 
                            value={values.mobile}
                            onChange={handleInputChange}
                            {...(errors.mobile && {error:true , helperText:errors.mobile})}
                            />
                            <TextField 
                            name="age"
                            variant="outlined"
                            label="Age" 
                            value={values.age}
                            onChange={handleInputChange}
                            />
                            <TextField 
                            name="address"
                            variant="outlined"
                            label="Address" 
                            value={values.address}
                            onChange={handleInputChange}
                            />

                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.smMargin}
                                    type="submit"
                                >Submit</Button>
                                <Button
                                    variant="contained"
                                    className={classes.smMargin}
                                    onClick={resetForm}
                                >Reset</Button>
                            </div>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
     );
}

const mapStateToProps = state =>({

    dCandidateList : state.dCandidate.list
}) 

const mapActionToProps = {

    createDcandidate: actions.create,
    updateDcandidate: actions.update
}

export default connect(mapStateToProps,mapActionToProps) (withStyles(styles)(DCandidateForm));


