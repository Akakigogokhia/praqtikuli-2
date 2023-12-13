import './contact.css';

const Contact = ({
  contactData,
  checkedIds,
  onToggleContactFromList,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type='checkbox'
          onChange={(e) => onToggleContactFromList(e, contactData.id)}
          checked={checkedIds.includes(contactData.id)}
        />
      </td>
      <td className='action' onClick={() => onDeleteClick(contactData.id)}>
        <i className='fa fa-trash-o' />
      </td>
      <td className='action' onClick={() => onEditClick(contactData.id)}>
        <i className='fa fa-pencil'></i>
      </td>
      <td>{contactData.name}</td>
      <td>{contactData.phoneNumber}</td>
    </tr>
  );
};

export default Contact;
