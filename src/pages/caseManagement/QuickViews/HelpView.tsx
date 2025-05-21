import QuickViewBase from '../../../components/QuickViewBase';

interface Props {
  show: boolean;
  onClose: () => void;
}


const HelpView= ({ show, onClose }: Props) => {
  const footerButtons = [
    { label: 'Cancel', onClick: onClose, variant: 'secondary' },
    { label: 'Apply', onClick: () => console.log("applying"), variant: 'primary' },
  ];

  return (
    <QuickViewBase show={show} onClose={onClose} title="Help: Case Management" footerButtons={footerButtons}>
      <p className="sub-header">
        The "Case" section is dedicated to managing and organizing cases. Here, users can import, view, and oversee case details,
        facilitating effective case management and resolution. This area provides comprehensive support for tracking case statuses,
        communications, and actions, supporting efficient case handling and customer service.
      </p>
    </QuickViewBase>
  );
};

export default HelpView;
