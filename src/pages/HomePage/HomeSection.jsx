import React from 'react'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import SectionItem from './SectionItem'

const HomeSection = () => {
  const [sections, setSections] = React.useState([])
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.sections.getNewSection)
      .then((res) => {
        setSections(res.data.sections)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      {sections?.map((section) => (
        <SectionItem key={section._id} section={section} fetchData={fetchData} />
      ))}
    </div>
  )
}

export default HomeSection
