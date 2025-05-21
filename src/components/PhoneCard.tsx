import React from 'react';

// Assuming the PhoneDirectory interface is defined in a file named PhoneDirectory.ts
import { PhoneDirectory } from "../types/phoneDirectories/phoneDirectoryTypes"
import { formatStringDate } from "../utils/dateUtils";
import HomeIcon from "../assets/img/commandbar/home_landline_phone_icon.svg";
import MobileIcon from "../assets/img/commandbar/mobile_smartphone_icon.svg";
import OtherIcon from "../assets/img/commandbar/other_service_icon.svg";
import FaxIcon from "../assets/img/commandbar/fax_phone_business_icon.svg";
import OfficeIcon from "../assets/img/commandbar/office_buildings_icon.svg";
import WorkIcon from "../assets/img/commandbar/briefcase_job_work_icon.svg";

interface PhoneCardProps {
    phone: PhoneDirectory;
}



const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
    const { PhoneType, FormattedNumber, Extension, VerifiedStatus, VerificationDate, Notes, IsPrimary, CountryCode, AreaCode, PhoneNumber } = phone;
    const verifiedText = VerifiedStatus ? `Yes (${formatStringDate(VerificationDate)})` : 'No';

    const getIconByPhoneType = (phoneType: string): string => {
        switch (phoneType.toLowerCase()) {
            case "mobile":
                
                return MobileIcon;
            case "home":
                return HomeIcon;
            case "other":
                return OtherIcon;
            case "fax":
                return FaxIcon;
        
            case "business":
                return OfficeIcon;
        
            case "work":
                return WorkIcon;
        
            default:
                return OtherIcon;
        }
    }

    return (
        <div className="phone-card">
            <div className="phone-header">
                <img src={getIconByPhoneType(PhoneType)} alt="Phone Type" style={{ width: "46px", height: "36px" }} />
                <span className="phone-name">{PhoneType}</span>
                {IsPrimary && <i className="primary-icon">✔</i>}{/* Primary phone indicator */}
            </div>
            <div className="phone-details">
                <span className="phone-info">{PhoneType}: {FormattedNumber || `${CountryCode}${AreaCode}${PhoneNumber}`}</span>
                {Extension && <span className="phone-info">Extension: {Extension}</span>}
                <span className="phone-info">Verified: {verifiedText}</span>
            </div>
            {Notes && <div className="phone-comments">
                {Notes}
            </div>}
        </div>
    );
};

export default PhoneCard;
