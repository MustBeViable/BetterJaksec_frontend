import React from 'react'

const UserManageButtonAdmin = ({user, setSelectedUser}) => {
  return (
    <button onClick={() => {setSelectedUser(user)}}>{user.name}</button>
  )
}

export default UserManageButtonAdmin