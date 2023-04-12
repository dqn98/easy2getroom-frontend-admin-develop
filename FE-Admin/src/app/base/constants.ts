export const Constant = {
    messagesAlertify: {
        ConfirmMessage: 'This action cannot undo. Do you want to continue ?',
        DeleteSuccess: 'Delete successfully',
        DeleteError: 'Delete failed',
        LoadError: 'Load data failed',
        LoadSuccess: 'Load data successfully',
        UpdateSuccess: 'Save changes successfully',
        UpdateError: 'Save changes failed',
        SendAnnouncementSuccess: 'Send announcement successfully',
        SendAnnouncementFailed: 'Send announcement failed',
    },
    pageSizeOptions: [10, 15, 20, 30, 50],
    propertyStatus: [
        { value: 0, text: 'Inactive' },
        { value: 1, text: 'Active' },
        { value: 2, text: 'Awaiting Approval' }
    ],
    status: {
        Inactive: 0,
        Active: 1,
        AwaitingApproval: 2
    },
    userRoles: [
        { value: 'Admin', text: 'Admin' },
        { value: 'Client', text: 'Client' }
    ],
    role: {
        Admin: 'Admin',
        Client: 'Client'
    },
    defaultAavatar: 'https://res.cloudinary.com/namqd98/image/upload/v1592814619/Default/defaultuser_qyklmd.png',
    messageStatus: {
        Sent: 'Sent',
        Recipient: 'Recipient'
    },
    announcementContent: {
        AnnouncementType: {
            Delete: 2,
            Warning: 4,
            Approved: 3,
            Normal: 1
        }

    }
}