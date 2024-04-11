import React from 'react'

function checkbox() {
  return (
    <div>
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text">Remember me</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-success" />
            </label>
        </div>
    </div>
  )
}

export default checkbox