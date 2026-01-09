import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Guide.css";

const Guide = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="back-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <div className="button-container">
        <button onClick={() => setActiveSection("new")}>ADD NEW FOLDER</button>
        <button onClick={() => setActiveSection("update")}>
          UPDATE THE EXISTING FOLDER
        </button>
      </div>

      <div className="isMobile">
        {activeSection === "new" && (
          <div className="new">
            <p>STEPS to add new folder</p>
            <p>Step1 : Open Cloudinary</p>
            <p>Step2: Go To Media Library Then Folder</p>
            <img src="Mobile1.png" alt="Step1" />
            <img src="Mobile2.png" alt="Step2" />
            <img src="Mobile3.png" alt="Step3" />
            <img src="Mobile4.png" alt="Step4" />
            <p>Step3: Create New Folder</p>
            <img src="Mobile5.png" alt="Step5" />
            <p>
              Step4: Now Add Images and Videos(videos only in Portfolio) in
              Folder
            </p>
            <p>Step5: Now Fill 1st Form</p>
            <p>Step6: Write the name of the Cloudinary folder in first field</p>
            <p>
              Step7: Enter the folder name as it should appear on the website
            </p>
            <p>
              Step8: Enter the folder type to determine which page (Portfolio or
              Service) it should appear on
            </p>
            <p>
              Step9: Enter the URL of the cover image you want to display for
              this folder
            </p>
            <img src="Mobile6.png" alt="Step6" />
            <p>Step10: Submit</p>
            <h2>Example</h2>
            <img src="Laptop4.png" alt="Example" />
          </div>
        )}

        {activeSection === "update" && (
          <div className="update">
            <p>STEPS to update folder</p>
            <p>Step1 : Open Cloudinary</p>
            <p>Step2: Go To Media Library Then Folder</p>
            <img src="Mobile1.png" alt="Step1" />
            <img src="Mobile2.png" alt="Step2" />
            <img src="Mobile3.png" alt="Step3" />
            <img src="Mobile4.png" alt="Step4" />
            <p>
              Step3: Open the folder in which you want add or remove images or
              video (videos only in Portfolio)
            </p>
            <p>Step4: Now Fill 2nd Form</p>
            <h5>
              ⚠️ Important: Verify the folder names carefully. Compare the
              images in your Cloudinary folder and your website folder, as some
              folders may have similar names (e.g., Portfolio: ‘Entertainment,
              Xmas Decor’ vs. Service: ‘Entertainments, Xmas Decors’). Enter
              both the Cloudinary folder and the website folder names correctly
              to avoid replacing the wrong folder
            </h5>
            <p>
              Step6: Enter the name of the Cloudinary folder in the first field,
              where you want to add or remove images or videos.
            </p>
            <p>
              Step7: Enter the name of the folder on your website that you want
              to update
            </p>
            <p>Step8: Cover image url in this form is optional</p>
            <img src="Laptop6.png" alt="Step8" />
            <p>Step9 :Submit</p>
            <h2>Example</h2>
            <img src="Laptop5.png" alt="Example" />
          </div>
        )}
      </div>

      <div className="isLaptop">
        {activeSection === "new" && (
          <div className="new">
            <p>STEPS to add new folder</p>
            <p>Step1 : Open Cloudinary</p>
            <p>Step2: Go To Media Library Then Folder</p>
            <img src="Laptop1.png" alt="Step1" />
            <img src="Laptop2.png" alt="Step2" />
            <p>Step3: Create New Folder</p>
            <img src="Laptop3.png" alt="Step3" />
            <p>Step4: Now Add Images and Videos(only in Portfolio) in Folder</p>
            <p>Step5: Now Fill 1st Form</p>
            <p>Step6: Write the name of the Cloudinary folder in first field</p>
            <p>
              Step7: Enter the folder name as it should appear on the website
            </p>
            <p>
              Step8: Enter the folder type to determine which page (Portfolio or
              Service) it should appear on
            </p>
            <p>
              Step9: Enter the URL of the cover image you want to display for
              this folder
            </p>
            <p>Step10: Submit</p>

            <h2>Example</h2>
            <img src="Laptop4.png" alt="Example" />
          </div>
        )}

        {activeSection === "update" && (
          <div className="update">
            <p>STEPS to update folder</p>
            <p>Step1 : Open Cloudinary</p>
            <p>Step2: Go To Media Library Then Folder</p>
            <img src="Laptop1.png" alt="Step1" />
            <img src="Laptop2.png" alt="Step2" />
            <p>
              Step3: Open the folder in which you want add or remove images or
              video (videos only in Portfolio)
            </p>
            <p>Step4: Now Fill 2nd Form</p>
            <h5>
              ⚠️ Important: Verify the folder names carefully. Compare the
              images in your Cloudinary folder and your website folder, as some
              folders may have similar names (e.g., Portfolio: ‘Entertainment,
              Xmas Decor’ vs. Service: ‘Entertainments, Xmas Decors’). Enter
              both the Cloudinary folder and the website folder names correctly
              to avoid replacing the wrong folder
            </h5>
            <p>
              Step6: Enter the name of the Cloudinary folder in the first field,
              where you want to add or remove images or videos.
            </p>
            <p>
              Step7: Enter the name of the folder on your website that you want
              to update
            </p>
            <p>Step8: Cover image url in this form is optional</p>
            <p>Step9 :Submit</p>
            <h2>Example</h2>
            <img src="Laptop5.png" alt="Example" />
          </div>
        )}
      </div>
    </>
  );
};

export default Guide;
