// DetailRow.js or DetailRow.tsx if using TypeScript
import React from "react";

import {
  Nav,
  Tab,
} from "react-bootstrap";

import SimpleTable from "../../../components/SimpleTable";
import { Account } from "../../../types/accounts/accountTypes";
import {
  contactColumns,
  phoneNumberColumns,
} from "./tableColumns";

const DetailRow = ({ account }: { account: Account }) => {
	return (
		<Tab.Container defaultActiveKey="first">
			<Nav variant="tabs">
				<Nav.Item>
					<Nav.Link eventKey="first">Phone Number</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link eventKey="third">Contact</Nav.Link>
				</Nav.Item>
			</Nav>
			<Tab.Content>
				<Tab.Pane eventKey="first">
					<SimpleTable
						data={account.PhoneDirectories}
						columns={phoneNumberColumns}
					/>
				</Tab.Pane>

				<Tab.Pane eventKey="third">
					<SimpleTable
						data={account.ContactList}
						columns={contactColumns}
					/>
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};

export default DetailRow;
