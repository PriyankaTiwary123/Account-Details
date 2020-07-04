
/**
 * Accordion Component for showing Transactions List with Transactions details .
 * @component
 * @example
 * return (
 *   <Accordion>
 * <table>Transactions details</table>
 * </<Accordion>
 * )
 */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
root: {
width: '100%',
},
heading: {
fontSize: theme.typography.pxToRem(15),
fontWeight: theme.typography.fontWeightRegular,
},
}));

export default function TransactionsDetails(props) {
let history= useHistory();
const classes = useStyles();
const [transactionVal , setTransactionVal] = useState([]);
let accountId= props.location && props.location.state &&  props.location.state.accountId;


useEffect(()=>{
axios.get(`./transactions-${accountId}.json`)
.then((res)=>{
setTransactionVal(res.data)})
.catch((err)=>{ console.log(err); })
},[accountId])

  /**redirects page to previous page****/
const goBackToAccountsPage=()=>{
history.goBack()
}

return (
  <div className="container-fluid transaction-details">
      <h4 className="account-header">Transaction listings</h4>
    <div className={classes.root}>
    {transactionVal.map((transactionDetails,index)=><Accordion key={index} className="accordian">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
    <p className={classes.heading}>{transactionDetails.description}</p>
    </AccordionSummary>
    <AccordionDetails>
    <table className="table table-responsive">
<thead>
<tr>
<th scope="col">Id</th>
  <th scope="col">From Account</th>
  <th scope="col">Transaction Date</th>
  <th scope="col">Transaction Processed</th>
  <th scope="col">Amount</th>
</tr>
</thead>
<tbody>
<tr>
  <th scope="row">{transactionDetails.id}</th>
  <td>{transactionDetails.from}</td>
  <td>{transactionDetails.transaction_date}</td>
  <td>{transactionDetails.transaction_processed}</td>
  <td>{transactionDetails.amount}</td>
</tr></tbody></table>
    </AccordionDetails>
  </Accordion> )}     
</div>
<Button variant="contained" color ="primary" className="back-btn" onClick={goBackToAccountsPage}>Back</Button>
  </div>

);
}