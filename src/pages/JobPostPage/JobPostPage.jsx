import React from 'react'
import JobImage from '../../assets/job.png'
import JobPost from '../../components/JobPost/JobPost'

const JobPostPage = () => {
  return (
    <div style={{display: 'flex', maxHeight: '100vh', maxWidth: '100vw'}}>
        <JobPost />
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <img src={JobImage} style={{
                position: 'absolute',
                maxheight: '100vh',
                width: '50vw',
                zIndex: 0
            }} alt="" />
            <h1
                style={{
                    position: "relative",
                    color: 'white',
                    zIndex: 1,
                    left: '50%',
                }}>
                Your Personal Job Finder
            </h1>
        </div>
    </div>
  )
}

export default JobPostPage