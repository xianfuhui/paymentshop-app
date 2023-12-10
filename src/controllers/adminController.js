const crypto = require('crypto');
const nodemailer = require('nodemailer');

const Admin = require('../models/adminModel');
const Bill = require('../models/billModel');
const Customer = require('../models/customerModel');
const ProductBill = require('../models/productBillModel');
const Product = require('../models/productModel');
const Staff = require('../models/staffModel');

// Thêm sản phẩm vào database
const postAddProduct = async (req, res) => {
    try {
        const {
            code_product,
            name_product,
            price_buy_product,
            price_sell_product,
        } = req.body;

        const newProduct = new Product({
            code_product,
            name_product,
            price_buy_product,
            price_sell_product,
            day_add_product: new Date()
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Chỉnh sửa sản phẩm vào database
const putEditProduct = async (req, res) => {
    const productId = req.params.id;
    const {
        code_product,
        name_product,
        price_buy_product,
        price_sell_product,
    } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            code_product,
            name_product,
            price_buy_product,
            price_sell_product,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật' });
        }

        return res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa sản phẩm vào database
const deleteDeleteProduct = async (req, res) => {
    const productId = req.params.id;
    
    try {
        const productExist = await ProductBill.findOne({ product: productId });

        if(productExist) {
            return res.status(404).json({ message: 'Không thể xóa vì sản phẩm này có trong hóa đơn' });
        }

        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Sản phẩm đã được xóa thành công' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin chi tiết nhân viên
const getListDetailStaff = async (req, res) => {
    const id_staff = req.params.id;

    try {
        const staff = await Staff.findById(id_staff);
        if (!staff) {
            //Không tìm thấy nhân viên
            return res.redirect('/404');
        }

        res.render('admin/listDetailStaff', { staff });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin tất cả sản phẩm
const getListProductAdmin = async (req, res) => {
    try {
        const list_product_admin = await Product.find();
        res.render('admin/listProductAdmin', { list_product_admin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin tất cả nhân viên
const getListStaff = async (req, res) => {
    try {
        const list_staff = await Staff.find();
        res.render('admin/listStaff', { list_staff });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Đăng nhập Admin
const getLoginAdmin = async (req, res) => {
    try {
        if (req.session.admin) {
            res.redirect('/admin/profile-admin');
        } else {
            res.render('admin/loginAdmin');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postLoginAdmin = async (req, res) => {
    const { name_admin, password_admin } = req.body;

    try {
        const admin = await Admin.findOne({ name_admin, password_admin });

        if (!admin) {
            req.flash('error', 'Nhập sai tên quản trị viên hoặc mật khẩu');
            return res.redirect('/admin/login-admin')
        } else {
            req.session.admin = admin;
            return res.redirect('/admin/profile-admin')
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin Admin hiện tại
const getProfileAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.session.admin._id);;

        if (!admin) {
            req.flash('error', 'Không tìm thấy quản trị viên đang đăng nhập. Vui lòng thử lại');
            return res.redirect('/admin/profile-admin')
        }

        res.render('admin/profileAdmin', { admin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Hiển thị form đăng ký Staff
const getRegisterStaff = async (req, res) => {
    try {
        res.render('admin/registerStaff');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postRegisterStaff = async (req, res) => {
    try {
        const { fullName, email } = req.body;

        const existingStaff = await Staff.findOne({ email_staff: email });
        if (existingStaff) {
            req.flash('error', 'Nhân viên đã tồn tại trong hệ thống');
            return res.redirect('/admin/register-staff');
        }

        const name = email.split('@')[0];
        const password = email.split('@')[0];

        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = Date.now() + 3600000;

        const newStaff = new Staff({
            avatar_staff: '/images/avatar_staff.jpg',
            full_name_staff: fullName,
            email_staff: email,
            name_staff: name,
            password_staff: password,
            date_staff: new Date(),
            status_staff: 1,
            check_click_email_staff: false,
            check_change_new_password_first_time_staff: false,
            email_verification_token: token,
            email_verification_token_expiration: tokenExpiration,
        });

        await newStaff.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'doraemondevops@gmail.com',
                pass: 'nkgr fdoh frdb etjp', 
            },
        });

        const mailOptions = {
            from: 'doraemondevops@gmail.com', 
            to: email,
            subject: 'Xác minh đăng ký tài khoản',
            html: `
          <p>Xin chào ${fullName},</p>
          <p>Vui lòng nhấp vào liên kết sau để xác minh đăng ký tài khoản:</p>
          <a href="http://localhost:3000/staff/verify-email-token-staff/${token}">Xác minh tài khoản</a>
        `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        req.flash('success', 'Email xác minh đã được gửi');
        return res.redirect('/admin/register-staff');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Đổi mật khẩu Admin hiện tại
const postChangePasswordAdmin = async (req, res) => {
    const { name_admin } = req.session.admin;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        const admin = await Admin.findOne({ name_admin: name_admin, password_admin: currentPassword });

        if (!admin) {
            req.flash('error', 'Nhập sai mật khẩu cũ');
            return res.redirect('/admin/profile-admin');
        }

        if (newPassword !== confirmPassword) {
            req.flash('error', 'Mật khẩu mới không trùng nhau');
            return res.redirect('/admin/profile-admin');
        }

        admin.password_admin = newPassword;

        await admin.save();

        req.flash('success', 'Đổi mật khẩu thành công');
        return res.redirect('/admin/profile-admin');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Upload avatar Admin
const postUploadAvatarAdmin = async (req, res) => {
    try {
        if (!req.file) {
            req.flash('error', 'Ảnh không thể tải lên. Vui lòng thử lại');
            return res.redirect('/admin/profile-admin');
        }

        const avatarPath = '/images/' + req.file.filename

        const admin = await Admin.findById(req.session.admin._id);

        if (!admin) {
            req.flash('error', 'Lỗi cơ sở dữ liệu. Vui lòng thử lại');
            return res.redirect('/admin/profile-admin');
        }

        admin.avatar_admin = avatarPath;
        await admin.save();

        req.flash('success', 'Đổi ảnh đại diện thành công');
        return res.redirect('/admin/profile-admin');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Change status Staff
const postChangeStatusStaff = async (req, res) => {
    const { staffId, currentStatus } = req.body;

    try {
        const staff = await Staff.findById(staffId);
        
        if (staff) {
            const currentStatusBoolean = currentStatus === 'true' ? true : false;
            staff.status_staff = !currentStatusBoolean;
            await staff.save();
        } else {
            res.status(404).send('Không tìm thấy nhân viên'); 
        }

        res.status(200).json({ message: 'Done' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Button send mail
const postSendTokenToEmailStaff = async (req, res) => {
    const { staffId } = req.body;

    try {
        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpiration = Date.now() + 3600000;

        const staff = await Staff.findById(staffId);

        if (staff) {
            staff.email_verification_token = token
            staff.email_verification_token_expiration = tokenExpiration

            await staff.save();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'doraemondevops@gmail.com',
                    pass: 'nkgr fdoh frdb etjp', 
                },
            });

            const mailOptions = {
                from: 'doraemondevops@gmail.com', 
                to: staff.email_staff,
                subject: 'Xác minh đăng ký tài khoản',
                html: `
            <p>Xin chào ${staff.full_name_staff},</p>
            <p>Vui lòng nhấp vào liên kết sau để xác minh đăng ký tài khoản:</p>
            <a href="http://localhost:3000/staff/verify-email-token-staff/${token}">Xác minh tài khoản</a>
            `,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } else {
            res.status(404).send('Không tìm thấy nhân viên'); 
        }

        res.status(200).json({ message: 'Done' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getLogoutAdmin = async (req, res) => {
    try {
        req.session.admin = null; 

        res.redirect('/admin/login-admin'); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    postAddProduct,
    putEditProduct,
    deleteDeleteProduct,
    getListDetailStaff,
    getListProductAdmin,
    getListStaff,
    getLoginAdmin,
    postLoginAdmin,
    getProfileAdmin,
    getRegisterStaff,
    postRegisterStaff,
    postChangePasswordAdmin,
    postUploadAvatarAdmin,
    postChangeStatusStaff,
    postSendTokenToEmailStaff,
    getLogoutAdmin,
};