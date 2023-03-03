import { useEffect, useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import userService from '../../../services/user.service';
import LongCardInfo from '../../../components/LongCardInfo';

const Index = () => {
  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    userService.getUsers(token)
      .then((data) => {
        setUsersArray(data);
        console.log(data);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <div>
      <AdminNav />
      {usersArray && usersArray.length > 0 ? (
        <div className="flex flex-col">
          {usersArray.map((item) => (
            <LongCardInfo
              key={item._id}
              title={item.email}
              image={'https://static1.millenium.org/articles/4/36/08/94/@/1303809-marie-ac-article_m-1.png'}
            >
              <p>Prénom : {item.firstName}</p>
              <p>Nom : {item.lastName}</p>
            </LongCardInfo>
          ))}
        </div>
      ) : (<p className='text-center'>Il n'y a aucun utilisateur.</p>)}

    </div >
  );
}

export default Index;