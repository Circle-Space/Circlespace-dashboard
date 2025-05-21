import React from 'react';

const GlobalVariablesInfo: React.FC = () => {

    return (
      <>
        <h5> Using Global Variables in Campaign Templates</h5>
        <hr className="bottom-gradient-border" />
        <p>
          Enhance your campaign content with our Global Variables feature.
          Utilize placeholders like $first_name in your template to
          automatically personalize messages for each recipient. For example, by
          inserting Good morning dear $first_name, ... in your template, the
          system will dynamically replace $first_name with the individual
          recipient's name, ensuring a tailored and engaging experience for each
          person. Remember, these variables are powerful tools to make your
          campaigns more relevant and impactful
        </p>

        <p>
          <span className="DocumentViewer-label">
            <b>First Name:</b>
          </span>
          <span className="DocumentViewer-content">$first_name</span>
        </p>
        <p>
          <span className="DocumentViewer-label">
            <b>Last Name:</b>
          </span>
          <span className="DocumentViewer-content">$last_name</span>
        </p>
        <p>
          <span className="DocumentViewer-label">
            <b>Email Address:</b>
          </span>
          <span className="DocumentViewer-content">$email_address</span>
        </p>
        <p>
          <span className="DocumentViewer-label">
            <b>Phone Number:</b>
          </span>
          <span className="DocumentViewer-content">$phone_number</span>
        </p>
        <p>
          <span className="DocumentViewer-label">
            <b>Street Address:</b>
          </span>
          <span className="DocumentViewer-content">$street_address</span>
        </p>
        <p>
          <span className="DocumentViewer-label">
            <b>City:</b>
          </span>
          <span className="DocumentViewer-content">$city</span>
        </p>
        <p>
          <span className="DocumentViewer-label">
            <b>Date of Birth:</b>
          </span>
          <span className="DocumentViewer-content">$date_of_birth</span>
        </p>
        <p>
          <span className="DocumentViewer-label">
            <b>Mobile No:</b>
          </span>
          <span className="DocumentViewer-content">$mobile_no</span>
        </p>
      </>
    );
}

export default GlobalVariablesInfo;