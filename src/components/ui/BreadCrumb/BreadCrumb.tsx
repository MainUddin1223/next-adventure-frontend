
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { IBreadCrumbProps } from '../types';


const BreadCrumb = ({items}: IBreadCrumbProps) => {
    const breadCrumbItems = [
        {
            title: (
                <Link href="/">
                    <HomeOutlined />
                </Link>
            )
        },
            ...items.map(item => {
                return {
                  title: item.link ? (
                <Link href={item.link}>
                            {
                                item.label
                    }
                </Link>
                    ) : (
                            <span>{ item.label}</span>
            )
                }
            })
    ]
 return <Breadcrumb items={breadCrumbItems} />;
}

export default BreadCrumb