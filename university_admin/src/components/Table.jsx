import React from 'react'

function Table({title, th}) {
    return (
        <>
            <div className="overflow-x">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>{th[0]}</th>
                    <th>{th[1]}</th>
                    <th>{th[2]}</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                </tr>
                </tbody>
            </table>
            </div>
        </>
    )
}

export default Table
