import {FormattedMessage} from "react-intl";

function PersonalModal({id, text, confirmRole}) {
   return(
       <>
           <div className="modal" id={id} data-bs-backdrop="static" data-bs-keyboard="false">
               <div className="modal-dialog">
                   <div className="modal-content">
                       <div className="modal-body text-black text-lg-center fw-bold mt-2 mb-4 fs-3">
                           <FormattedMessage id={text}/>
                       </div>
                       <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><FormattedMessage id="cancel"/></button>
                           <button type={confirmRole} className="btn btn-primary" data-bs-dismiss="modal"><FormattedMessage id="confirm"/></button>
                       </div>
                   </div>
               </div>
           </div>
       </>
   )
}

export default PersonalModal;
