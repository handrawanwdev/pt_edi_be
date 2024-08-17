module.exports = {

    formatDate:(inputDate = Date.now())=>{
        let dateObj = new Date(inputDate);
        // Mengambil tanggal, bulan, dan tahun dari objek Date
        let day = dateObj.getDate();
        let monthIndex = dateObj.getMonth();
        let year = dateObj.getFullYear();
    
        let formattedDate = `${year}-${monthIndex+1}-${day}`;
    
        return formattedDate;
    }

};