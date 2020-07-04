
/**
 * Accordion Component for showing Account List with details .
 * 
 * @component
 * @example 
 * return (
 *   <Accordion>
 * <table>account details</table>
 * </<Accordion>
 * )
 */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function AccountDetails() {
  const [accountData, setAccountData] = useState([]);
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("./accounts.json")
      .then((res) => {
        setAccountData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    /** @param{Object} accountDetails
         redirects page to given path("/pathLink")
     */
  const goToTransactionDetails = (e, accountDetails) => {
    history.push({
      pathname: "/transaction",
      state: {
        accountId: accountDetails.id,
        accountNumber: accountDetails.account_number,
      },
    });
  };

  return (
    <div className="container-fluid account-details">
      <h4 className="account-header">Account details</h4>
      <div className={classes.root}>
        {accountData ? (
          accountData.map((accountDetails, index) => (
            <Accordion key={index} className="accordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Account Number:{" "}
                  <a
                    href="/transaction"
                    className="account-link"
                    onClick={(e) => goToTransactionDetails(e, accountDetails)}
                  >
                    {accountDetails.account_number}
                  </a>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="account-table table-responsive">
                  <table className="table table-striped table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Account Name</th>
                        <th scope="col">Account Type</th>
                        <th scope="col">Account Balance</th>
                        <th scope="col">currency</th>
                        <th scope="col">Is Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{accountDetails.id}</th>
                        <td>{accountDetails.account_name}</td>
                        <td>{accountDetails.account_type}</td>
                        <td>{accountDetails.balance}</td>
                        <td>{accountDetails.currency}</td>
                        <td>{accountDetails.is_active}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <div>No Account Details</div>
        )}
      </div>
    </div>
  );
}
