import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/dCandidate'
import { ButtonGroup,Button,Grid,Paper,TableContainer,TableHead, Table, TableRow, TableCell, TableBody, withStyles } from '@material-ui/core';
import DCandidateForm from './DCandidateForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useToasts} from 'react-toast-notifications'


const styles = theme => ({

    root:{
        "& .MuiTableCell-head" : {
            fontSize: "1.25rem"
        }
    },

    paper:{
        margin : theme.spacing(2), //by default spacing 8px * 2(out case)
        padding : theme.spacing(2),
    }
})

const DCandidates = ({classes,...props}) => {

    const [currentId,setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllDCandidates();
    },[]) //componentDidMount

    const {addToast} = useToasts()
    const onDelete = (id) =>{
        if(window.confirm('Are you sure to delete this record?')){
            props.deleteDCandidate(id, () => addToast("Deleted Successfully" , {appearance: 'info'}));
        }
    }


    return (  
        <Paper className= {classes.paper} elevation={3} >
            <Grid container>
                <Grid item xs = {6}>
                    <DCandidateForm 
                        {...({currentId, setCurrentId})}
                        >

                    </DCandidateForm>
                </Grid>
                <Grid item xs = {6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    props.dCandidateList.map((record,index) => {
                                        return(<TableRow key ={index} hover> 
                                                <TableCell>
                                                    {record.fullNme}
                                                </TableCell>
                                                <TableCell>
                                                    {record.mobile}
                                                </TableCell>
                                                <TableCell>
                                                    {record.bloodGroup}
                                                </TableCell>
                                                <TableCell>
                                                        <ButtonGroup variant="text">
                                                            <Button>
                                                                <EditIcon 
                                                                    color="primary"
                                                                    onClick={() => {setCurrentId(record.id)}}
                                                                    ></EditIcon>
                                                            </Button>
                                                            <Button>
                                                                <DeleteIcon 
                                                                    color="secondary"
                                                                    onClick={() => onDelete(record.id)}
                                                                    ></DeleteIcon>
                                                            </Button>
                                                        </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

 
const mapStateToProps = state =>({

    dCandidateList : state.dCandidate.list
}) 

const mapActionToProps = {

    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate : actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)( DCandidates));