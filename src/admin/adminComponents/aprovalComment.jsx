import React from 'react'
import axios from 'axios'

function ApprovalComment() {

    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        async function GetValue() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/feedback`);
                setComments(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        GetValue();
    }, [comments])

    async function handleApprove(id) {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/feedback`, {
                _id: id
            });
            const updated = response.data.data;

            setComments(prev =>
                prev.map(item =>
                    item._id === updated._id ? updated : item
                )
            );

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container mt-4'>
            <h1 className='mb-3'>Approval Comments</h1>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Email</th>
                        <th>Comment</th>
                        <th>Stars</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {comments.length===0? <tr><td className='text-center fw-lighter text-secondary fs-5' colSpan={7}>Not comments available</td></tr>:null}
                    {comments.map((item) => (
                        <tr key={item._id}>

                            <td>
                                <img
                                    src={item.productId?.image?.[0]}
                                    alt={item.productId?.name}
                                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />
                            </td>

                            <td>{item.productId?.name}</td>
                            <td>{item.ratingEmail}</td>
                            <td>{item.ratingComments}</td>
                            <td>{item.ratingStars}</td>

                            <td>
                                {item.approval ? "Approved" : "Pending"}
                            </td>

                            <td>
                                {!item.approval && (
                                    <button
                                        className='btn btn-success btn-sm'
                                        onClick={() => handleApprove(item._id)}
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ApprovalComment;