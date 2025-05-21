import React from "react";

interface Section {
	title: string;
	value: string;
}

interface Props {
	header: string;
	subHeader?: string;
	subHeader1?: string;
	tabs: string[];
	activeTab: string;
	onChange: (tab: string) => void;
	sections?: Section[];
}

const TabCommandBar = ({ header, subHeader, subHeader1, tabs, activeTab, onChange, sections }: Props) => {
	return (
		<div style={{ marginTop: -4 }} className="tab-command-bar p-2">
			<h3 className="mb-3">{header}</h3>
			{subHeader && (
				<span className="command-btn-text mb-2" style={{ marginTop: -16 }}>{subHeader}</span>
			)}
			{subHeader1 && (
				<span className="command-btn-text mb-2" style={{ marginTop: -16 }}>{subHeader1}</span>
			)}
			<div className="tab-command-bar-sections-container">
				{sections && sections.map((section, index) => (
					<React.Fragment key={index}>
						{index > 0 && <div className="tab-command-bar-vertical-divider"></div>}
						<div className="tab-command-bar-section">
							<div className="tab-command-bar-title">{section.title}</div>
							<div className="tab-command-bar-value">{section.value}</div>
						</div>
					</React.Fragment>
				))}
			</div>

			<div>
				{tabs.map((t) => (
					<button
						key={t}
						type="button"
						onClick={() => onChange(t)}
						className={`btn  ${t === activeTab ? 'active-tab-command-bar' : 'inactive-tab-command-bar'}`}
					>
						{t}
					</button>
				))}
			</div>
		</div>
	);
};

export default TabCommandBar;


