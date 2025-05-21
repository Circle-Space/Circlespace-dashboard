// DetailRow.js or DetailRow.tsx if using TypeScript
import React from "react";
import { Nav, Tab } from "react-bootstrap";
import SimpleTable from "../../../components/SimpleTable";
import { Contact } from "../../../types/contacts/contactsTypes";
import {
	accountColumns, phoneNumberColumns, socialMediaColumns,
} from "./tableColumns";

const DetailRow = ({ contact }: { contact: Contact }) => {
	return (
		<Tab.Container defaultActiveKey="first">
			<Nav variant="tabs">
				<Nav.Item>
					<Nav.Link eventKey="first">Phone Number</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="second">Social Media</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="third">Accounts</Nav.Link>
				</Nav.Item>
			</Nav>
			<Tab.Content>
				<Tab.Pane eventKey="first">
					<SimpleTable
						data={contact.PhoneDirectories}
						columns={phoneNumberColumns}
					/>
				</Tab.Pane>
				<Tab.Pane eventKey="second">
					<SimpleTable
						data={contact.SocialMedias}
						columns={socialMediaColumns}
					/>
				</Tab.Pane>
				<Tab.Pane eventKey="third">
					<SimpleTable
						data={contact.AccountList}
						columns={accountColumns}
					/>
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};

export default DetailRow;
