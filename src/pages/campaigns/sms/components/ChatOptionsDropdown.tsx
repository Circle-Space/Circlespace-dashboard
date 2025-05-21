import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { MoreHorizontal } from 'react-feather';
import AppointmentsIcon from '../../../../assets/img/commandbar/appointment_calendar_event calendar_schedule_timetable_icon.svg';
import AppointmentSentIcon from '../../../../assets/img/commandbar/calendar_email_schedule_icon.svg';
import AppointmentSetIcon from '../../../../assets/img/commandbar/calendarset_calendar_clock_event_planning_icon.svg';
import Failed from '../../../../assets/img/commandbar/fail.svg';
import FollowUpIcon from '../../../../assets/img/commandbar/followup_call_contact us_contacts_email_message_icon.svg';
import InterestedIcon from '../../../../assets/img/commandbar/interested_energy_idea_light_lightbulb_icon.svg';
import NotInterested from '../../../../assets/img/commandbar/not_interested.svg';
import QuotedIcon from '../../../../assets/img/commandbar/quoted_calculate_calculator_education_math_icon.svg';
import Sold from '../../../../assets/img/commandbar/sold.svg';
import DoNotCallIcon from '../../../../assets/img/commandbar/stopcall.svg';
import useDeviceManagement from '../../../../hooks/useDeviceMangement';
import { PaginationType } from '../../../../types/apiResponse';

interface Props {
  chatId: string | undefined;
  fetchConversation: (paginationType: PaginationType) => void;
}

const ChatOptionsDropdown = ({ chatId, fetchConversation }: Props) => {
  const [show, setShow] = useState(false);
  const { updateStatusType } = useDeviceManagement();
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    // Add the event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Return a cleanup function that removes the event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  const handleItemClick = (name: string) => {
    const statusMap: Record<string, string> = {
      "Do Not Call": "DoNotCall",
      Interested: "Interested",
      "Not Interested": "NotInterested",
      Quoted: "Quoted",
      "Follow-Up": "FollowUp",
      Appointments: "Appointments",
      "Appointment Sent": "AppointmentSent",
      "Appointment Set": "AppointmentSet",
      "Sold": "Sold",
      "Failed": "Failed"
    };

    const status = statusMap[name];
    if (status) {
      updateStatusType(
        chatId || "",
        status,
        "SMS",
        () => {
          setShow(false);
          fetchConversation("CURRENT")
        });
    }
  };

  const options = [
    { name: "Do Not Call", icon: DoNotCallIcon },
    { name: "Interested", icon: InterestedIcon },
    { name: "Not Interested", icon: NotInterested },
    { name: "Quoted", icon: QuotedIcon },
    { name: "Follow-Up", icon: FollowUpIcon },
    { name: "Appointments", icon: AppointmentsIcon },
    { name: "Appointment Sent", icon: AppointmentSentIcon },
    { name: "Appointment Set", icon: AppointmentSetIcon },
    { name: "Sold", icon: Sold },
    { name: "Failed", icon: Failed },
  ];

  return (
    <div ref={dropdownRef} className="chat-options-dropdown">
      <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-more">More</Tooltip>}>
        <MoreHorizontal onClick={() => setShow(prev => !prev)} style={{ cursor: 'pointer' }} />
      </OverlayTrigger>

      <Dropdown show={show} onToggle={isOpen => setShow(isOpen)}>
        <Dropdown.Menu align="end" variant="light" style={{ margin: '0px', width: 'auto', minWidth: '0' }}>
          {options.map((option, index) => (
            <OverlayTrigger key={index} placement="right" overlay={<Tooltip id={`tooltip-${index}`}>{option.name}</Tooltip>}>
              <Dropdown.Item onClick={() => handleItemClick(option.name)} style={{ width: 'auto', minWidth: '0' }}>
                <img src={option.icon} alt={option.name} style={{ width: '16px', height: '16px' }} />
                {/* {option.name} */}
              </Dropdown.Item>
            </OverlayTrigger>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};


export default ChatOptionsDropdown;
