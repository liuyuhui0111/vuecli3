function validByPhone(phone) {
    // 校验手机号
    const myreg = /^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    }
    return true;
}
function validByTel(value) {
    // 校验手机固定电话
    let isPhone = /^([0-9]{3,4}[-|\s])?[0-9]{7,8}$/;
    let isMob = /^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if (isMob.test(value) || isPhone.test(value)) {
        return true;
    }

    return false;
}

function validByBankNo(value) {
    // 校验银行卡号
    let isBankNo = /^\d{16}|\d{19}$/;
    if (isBankNo.test(value)) {
        return true;
    }

    return false;
}


function validByEmail(email) {
    // 判断用户输入的电子邮箱格式是否正确
    const myreg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (!myreg.test(email)) {
        return false;
    }
    return true;
}

function validByName(name) {
    // 校验手机号
    const myreg = /^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/;
    if (!myreg.test(name)) {
        return false;
    }
    return true;
}

export {
    validByPhone,
    validByName,
    validByEmail,
    validByTel,
    validByBankNo,
};
