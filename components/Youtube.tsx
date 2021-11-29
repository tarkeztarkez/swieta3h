import React from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player';


function Youtube(props: ReactPlayerProps) {
    return <ReactPlayer {...props} />
}

export default Youtube
