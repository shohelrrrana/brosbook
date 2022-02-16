import React, { useState } from 'react'
import Link                from "next/link"
import { toast }           from "react-toastify"
import useAsyncEffect      from "use-async-effect"

import Avatar   from "@components/common/Avatar"
import { User } from '@interfaces/user.interfaces'
import api      from "@api/index"


export default function Sidebar() {

    const [ users, setUsers ] = useState<User[]>( [] )

    useAsyncEffect( fetchSuggestedUsers, [] )

    async function fetchSuggestedUsers() {
        /*try {
         const { data } = await api.users.fetchSuggestedUsers()
         setUsers( data.users )
         } catch ( err: any ) {
         console.error( err.response?.data?.message )
         }*/
    }

    async function handleFollowClick( user: User ) {
        try {
            const { data } = await api.follows.addFollowing( user.username )
            toast.success( data.message )
        } catch ( err: any ) {
            toast.error( err.response?.data?.message )
        }
    }

    return (
        <div className="box p-5">
            <h2 className="text-xl font-medium mb-3">Suggested People</h2>

            { users && users.map( user => (
                <div className="flex" key={ user.id }>
                    <Link href={ `/${ user.username }` }>
                        <a className="block min-w-[40px] mr-2">
                            <Avatar src={ user.photo }/>
                        </a>
                    </Link>
                    <div>
                        <div className="flex justify-between">
                            <Link href={ `/${ user.username }` }>
                                <a>
                                    <h3 className="text-md font-medium">
                                        { user.fullName }
                                    </h3>
                                    <h4 className="text-sm text-gray-700">
                                        @{ user.username }
                                    </h4>
                                </a>
                            </Link>
                            <div>
                                <button onClick={ () => handleFollowClick( user ) }
                                        className="button-blue rounded-full py-2 px-5">
                                    Follow
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">{ user.profile?.bio }</div>
                    </div>
                </div>
            ) ) }
        </div>
    )
}