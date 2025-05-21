import React from "react";

import { Button } from "react-bootstrap";
import {
	utils,
	writeFile,
} from "xlsx";

import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Opportunities } from "../../../types/oppurtunities/opportunitiesTypes";

interface Props {
	data: Opportunities[] | undefined;
}

function exportToExcel(data: Opportunities[], fileName: string) {
	const worksheet = utils.json_to_sheet(data);
	const workbook = utils.book_new();
	utils.book_append_sheet(workbook, worksheet, 'Sheet1');
	writeFile(workbook, `${fileName}.xlsx`);
}

const ExportButton: React.FC<Props> = ({ data }) => {
	const handleExportClick = () => {
		if (data) {
			exportToExcel(data, 'Opportunities');
		}
	};

	return (
		<Button variant='outline-secondary' size='sm' onClick={handleExportClick}>
			<FontAwesomeIcon icon={faFileExcel} style={{ paddingRight: "5px" }} />
			Export to Excel
		</Button>
	)
};

export default ExportButton;