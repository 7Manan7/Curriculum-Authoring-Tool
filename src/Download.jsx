import React, { Component } from "react";
import jsPDF from "jspdf";

class Download extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	createPDF = () => {
		let doc = new jsPDF("p", "pt");
		doc.text(20, 20, JSON.stringify(this.props.data, null, 2));
		doc.setFont("courier");
		doc.save("generated curriculum.pdf");
	};

	render() {
		return (
			<button onClick={this.createPDF} className="add-button">
				<img
										src="https://img.icons8.com/bubbles/30/000000/download.png"
										alt="Download Icon"
										className="add-icon"
									/>
				Download PDF
			</button>
		);
	}
}

export default Download;
