import {FormattedMessage} from "react-intl";
import PasswordEdit from "./PasswordEdit";
import DataEdit from "./DataEdit";
function ModifyPersonalInformation() {

    return (
        <>
            <div className="d-flex align-content-center text-white justify-content-center mt-2">
                <div className="primary-color p-4 rounded">
                    <ul className="nav nav-tabs mb-4">
                        <li className="nav-item w-50 text-lg-center">
                            <button className="nav-link w-100 active" data-bs-toggle="tab" data-bs-target="#dataEdit" type="button" role="tab"><FormattedMessage id="info"/></button>
                        </li>
                        <li className="nav-item w-50 text-lg-center">
                            <button className="nav-link w-100 " data-bs-toggle="tab" data-bs-target="#passwordEdit" type="button" role="tab"><FormattedMessage id="password"/></button>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="dataEdit" role="tabpanel"><DataEdit/></div>
                        <div className="tab-pane fade" id="passwordEdit" role="tabpanel"><PasswordEdit/></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifyPersonalInformation;