import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from '@fortawesome/free-solid-svg-icons';

interface ModalSliderBaseProps {
    title: string, //title of the modal
    sideTab?: boolean, //defines whether the side tab shows to trigger the modal
    sideTabTitle?: string | null, //text on the side tab
    children: React.ReactNode, //any content inside the ModalSliderBase component will render in the body of the modal
    isOpen: boolean, //opens / closes modal
    allowOverflowVisible?: boolean, // allows overflow temporarily for those controls which need it
    setIsOpen: (isOpen: boolean) => void, //this allows the setIsOpen to be run from either the parent or the child component
}
const ModalSliderBase = ({
    title,
    sideTab = false,
    sideTabTitle = '',
    children,
    isOpen,
    allowOverflowVisible = false,
    setIsOpen
}: ModalSliderBaseProps) => {
    let innerRef = null;
    const settingsContentClass = `settings-content ${allowOverflowVisible ? 'allow-overflow-visible' : ''}`;
    return (
        <div
            ref={innerRef}
            className={`settings js-settings ${isOpen ? "open" : ""}`}
        >
            {sideTab && (
                <div className="settings-toggle">
                    <div
                        className="settings-toggle-option settings-toggle-option-text js-settings-toggle"
                        title={title}
                        onClick={() => setIsOpen(true)}
                    >
                        <FontAwesomeIcon icon={faSliders} /> {sideTabTitle}
                    </div>
                </div>
            )}
            <div className="settings-panel">
                <div className={settingsContentClass}>
                    <div className="settings-title d-flex align-items-center">
                        <button
                            type="button"
                            className="btn-close float-right js-settings-toggle"
                            aria-label="Close"
                            onClick={() => setIsOpen(false)}
                        ></button>
                        <h4 className="mb-0 ms-2 d-inline-block">{title}</h4>
                    </div>
                    <div className="settings-body">
                        {children}
                    </div>
                    <div className="settings-footer">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSliderBase