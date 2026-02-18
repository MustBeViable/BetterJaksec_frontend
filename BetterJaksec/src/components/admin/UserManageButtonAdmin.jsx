import React from 'react'

const UserManageButtonAdmin = ({user, setSelectedUser}) => {
  return (
    <button onClick={() => {setSelectedUser(user)}}>{user.firstName} {user.lastName}</button>
  )
}

export default UserManageButtonAdmin