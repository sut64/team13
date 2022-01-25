package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Role{}, &User{},
		&Job{}, &Insurance{}, &Patient{}, &Sex{},
		&Screening{},
		&Treatment{}, &RemedyType{},
		&Appoint{},
		&MedicalProduct{}, &MedRecord{},
		&Payment{},
	)

	db = database

	// ตำแหน่งงาน --------------------------------------------------------------
	role1 := Role{
		Name: "Dentist",
	}
	db.Model(&Role{}).Create(&role1)

	role2 := Role{
		Name: "Dental assistant",
	}
	db.Model(&Role{}).Create(&role2)

	role3 := Role{
		Name: "Nurse",
	}
	db.Model(&Role{}).Create(&role3)

	role4 := Role{
		Name: "Pharmacist",
	}
	db.Model(&Role{}).Create(&role4)

	role5 := Role{
		Name: "Financial officer",
	}
	db.Model(&Role{}).Create(&role5)

	// รวมสมาชิกทุกตำแหน่ง >> entity User -------------------------------------------------------
	password1, _ := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	password2, _ := bcrypt.GenerateFromPassword([]byte("5678"), 14)
	dentist1 := User{
		Firstname: "นิตยา",
		Lastname:  "สุภาพ",
		Username:  "nita",
		Password:  string(password2),
		Role:      role1,
	}
	db.Model(&User{}).Create(&dentist1)

	dentist2 := User{
		Firstname: "อภิสิทธิ์",
		Lastname:  "สะโมรส",
		Username:  "miles",
		Password:  string(password1),
		Role:      role1,
	}
	db.Model(&User{}).Create(&dentist2)

	dentistass1 := User{
		Firstname: "ทันตะ",
		Lastname:  "ฟันดี",
		Username:  "pitch",
		Password:  string(password1),
		Role:      role2,
	}
	db.Model(&User{}).Create(&dentistass1)

	dentistass2 := User{
		Firstname: "กันตพิชญ์",
		Lastname:  "แพงดี",
		Username:  "kantapit",
		Password:  string(password2),
		Role:      role2,
	}
	db.Model(&User{}).Create(&dentistass2)

	nurse1 := User{
		Firstname: "พัชรชาติ",
		Lastname:  "จิระศรีโสภา",
		Username:  "few",
		Password:  string(password1),
		Role:      role3,
	}
	db.Model(&User{}).Create(&nurse1)

	nurse2 := User{
		Firstname: "ฉอฉิ่ง",
		Lastname:  "ตีดัง",
		Username:  "pcrc",
		Password:  string(password2),
		Role:      role3,
	}
	db.Model(&User{}).Create(&nurse2)

	pharmacist1 := User{
		Firstname: "รัฐธรรมนูญ",
		Lastname:  "ประวาสุข",
		Username:  "top",
		Password:  string(password1),
		Role:      role4,
	}
	db.Model(&User{}).Create(&pharmacist1)

	pharmacist2 := User{
		Firstname: "ซอโซ่ ",
		Lastname:  "ล่ามดี",
		Username:  "q1234",
		Password:  string(password2),
		Role:      role4,
	}
	db.Model(&User{}).Create(&pharmacist2)

	financial1 := User{
		Firstname: "ธโนดม",
		Lastname:  "โชติบำรุงพงศ์",
		Username:  "tanodom",
		Password:  string(password1),
		Role:      role5,
	}
	db.Model(&User{}).Create(&financial1)

	financial2 := User{
		Firstname: "ฐอฐาน",
		Lastname:  "เข้ามารอง",
		Username:  "s1234",
		Password:  string(password2),
		Role:      role5,
	}
	db.Model(&User{}).Create(&financial2)

	// เพศ --------------------------------------------------------------------------------------
	sex1 := Sex{
		Name: "ชาย",
	}
	db.Model(&Sex{}).Create(&sex1)

	sex2 := Sex{
		Name: "หญิง",
	}
	db.Model(&Sex{}).Create(&sex2)

	// อาชีพ --------------------------------------------------------------------------------------------
	job1 := Job{
		Name: "ราชการ",
	}
	db.Model(&Job{}).Create(&job1)

	job2 := Job{
		Name: "รัฐวิสหกิจ",
	}
	db.Model(&Job{}).Create(&job2)

	job3 := Job{
		Name: "นักศึกษา",
	}
	db.Model(&Job{}).Create(&job3)

	// สิทธิการรักษา ------------------------------------------------------------------------------------------------
	insurance1 := Insurance{
		Name:   "สิทธิสวัสดิการข้าราชการ",
		Detail: "ข้าราชการและบคุคลในครอบครัวสามารถใช้สิทธิ์เบิกจ่ายตรง โดยใช้บัตรประชาชนในการเข้ารับบริการรักษาพยาบาลประเภทผู้ป่วยนอกทุกครั้ง ณ จุดชำระเงินโดยหากไม่ได้นำบัตรประชาชนมาแสดง หรือเอกสารที่กรมบัญชีกลางกำหนด ผู้รับบริการจะต้องสำรองจ่ายเงินค่ารักษาพยาบาลไปก่อน แล้วนำใบเสร็จรับเงินไปเบิกคืนกับส่วนราชการต้นสังกัด",
	}
	db.Model(&Insurance{}).Create(&insurance1)

	insurance2 := Insurance{
		Name:   "สิทธิประกันสังคม",
		Detail: "สามารถใช้สิทธิ์ได้เฉพาะกรณีที่มีใบส่งตัวมาจากโรงพยาบาลต้นสังกัด และชำระเงินสดเท่านั้น ยกเว้น กรณีมีใบส่งตัวยืนยันการให้วางบิลโรงพยาบาลต้นสังกัดได้ ",
	}
	db.Model(&Insurance{}).Create(&insurance2)

	insurance3 := Insurance{
		Name:   "สิทธิหลักประกันสุขภาพ 30 บาท",
		Detail: "คุ้มครองบุคคลที่เป็นคนไทยมีเลขประจำตัวประชาชน 13 หลักที่ไม่ได้รับสิทธิสวัสดิการข้าราชการ หรือ สิทธิประกันสังคม หรือสิทธิสวัสดิการรัฐวิสาหกิจ หรือสิทธิอื่น ๆ จากรัฐ",
	}
	db.Model(&Insurance{}).Create(&insurance3)

	// ประเภทการรักษา ------------------------------------------------------------------------------------------------
	remedy1 := RemedyType{
		Name: "อุดฟัน",
	}
	db.Model(&RemedyType{}).Create(&remedy1)

	remedy2 := RemedyType{
		Name: "ขูดหินปูน",
	}
	db.Model(&RemedyType{}).Create(&remedy2)

	remedy3 := RemedyType{
		Name: "เอ็กซ์เรย์",
	}
	db.Model(&RemedyType{}).Create(&remedy3)

	// เวชระเบียน ------------------------------------------------------------------------------------------------------------
	patient1 := Patient{
		Firstname: "พัชรชาติ",
		Lastname:  "จิรศรีโสภา",
		Birthday:  time.Date(2009, 1, 1, 0, 0, 0, 0, time.UTC),
		IDcard:    "1329900000000",
		Tel:       "0902571569",
		Wight:     120,
		Height:    160.5,
		Time:      time.Now(),
		Sex:       sex1,
		Job:       job3,
		Insurance: insurance3,
		Nurse:     nurse1,
	}
	db.Model(&Patient{}).Create(&patient1)

	patient2 := Patient{
		Firstname: "สมหญิง",
		Lastname:  "ซิ่งรถไถ",
		Birthday:  time.Date(2002, 1, 1, 0, 0, 0, 0, time.UTC),
		IDcard:    "1329900000001",
		Tel:       "0808571549",
		Wight:     57,
		Height:    173.5,
		Time:      time.Now(),
		Sex:       sex2,
		Job:       job1,
		Insurance: insurance1,
		Nurse:     nurse1,
	}
	db.Model(&Patient{}).Create(&patient2)

	patient3 := Patient{
		Firstname: "สมชาย",
		Lastname:  "มาอุดฟัน",
		Birthday:  time.Date(20012, 1, 1, 0, 0, 0, 0, time.UTC),
		IDcard:    "1329900000005",
		Tel:       "0934547915",
		Wight:     65,
		Height:    160.5,
		Time:      time.Now(),
		Sex:       sex2,
		Job:       job1,
		Insurance: insurance1,
		Nurse:     nurse2,
	}
	db.Model(&Patient{}).Create(&patient3)

	// ยาและเวชภัณฑ์ -----------------------------------------------------------------------------------------------
	MedicalProduct1 := MedicalProduct{
		Name: "Paracetamol(กระปุก)",
	}
	db.Model(&MedicalProduct{}).Create(&MedicalProduct1)

	MedicalProduct2 := MedicalProduct{
		Name: "Paracetamol(เม็ด)",
	}
	db.Model(&MedicalProduct{}).Create(&MedicalProduct2)

	MedicalProduct3 := MedicalProduct{
		Name: "ไหมขัดฟัน",
	}
	db.Model(&MedicalProduct{}).Create(&MedicalProduct3)

	// คัดกรองผู้ป่วย ------------------------------------------------------------------------------------------------
	screening1 := Screening{
		Illnesses:      "ปวดฟัน",
		Queue:          10,
		Date:           time.Now(),
		Patient:        patient1,
		Dentistass:     dentistass1,
		MedicalProduct: MedicalProduct2,
	}
	db.Model(&Screening{}).Create(&screening1)

	screening2 := Screening{
		Illnesses:      "เหงือกอักเสบ",
		Queue:          11,
		Date:           time.Now(),
		Patient:        patient2,
		Dentistass:     dentistass1,
		MedicalProduct: MedicalProduct1,
	}
	db.Model(&Screening{}).Create(&screening2)

	screening3 := Screening{
		Illnesses:      "ปวดฟัน",
		Queue:          12,
		Date:           time.Now(),
		Patient:        patient3,
		Dentistass:     dentistass1,
		MedicalProduct: MedicalProduct2,
	}
	db.Model(&Screening{}).Create(&screening3)

	// ใบวินิฉัย --------------------------------------------------------------------------------------------------------------------
	treatment1 := Treatment{
		PrescriptionRaw:  "A12",
		PrescriptionNote: "",
		ToothNumber:      12,
		Date:             time.Now(),
		ToothFilling:     "Amalgam",
		Screening:        screening1,
		Dentist:          dentist1,
		RemedyType:       remedy1,
	}
	db.Model(&Treatment{}).Create(&treatment1)

	treatment2 := Treatment{
		PrescriptionRaw:  "A12",
		PrescriptionNote: "",
		ToothNumber:      20,
		ToothFilling:     "Resin",
		Date:             time.Now(),
		Screening:        screening2,
		Dentist:          dentist1,
		RemedyType:       remedy2,
	}
	db.Model(&Treatment{}).Create(&treatment2)

	treatment3 := Treatment{
		PrescriptionRaw:  "A12",
		PrescriptionNote: "",
		ToothNumber:      21,
		ToothFilling:     "Amalgam",
		Date:             time.Now(),
		Screening:        screening3,
		Dentist:          dentist2,
		RemedyType:       remedy3,
	}
	db.Model(&Treatment{}).Create(&treatment3)

	// การนัดหมาย ---------------------------------------------------------------------------------------------------------------
	appoint1 := Appoint{
		AppointTime: time.Now(),
		Todo:        "งดน้ำ 3 ชั่วโมง",
		Room:        1,
		Dentist:     dentist1,
		Patient:     patient1,
		RemedyType:  remedy1,
	}
	db.Model(&Appoint{}).Create(&appoint1)

	appoint2 := Appoint{
		AppointTime: time.Now(),
		Todo:        "-",
		Room:        3,
		Dentist:     dentist1,
		Patient:     patient2,
		RemedyType:  remedy2,
	}
	db.Model(&Appoint{}).Create(&appoint2)

	appoint3 := Appoint{
		AppointTime: time.Now(),
		Todo:        "งดอาหาร 12 ชั่วโมง",
		Room:        1,
		Dentist:     dentist1,
		Patient:     patient1,
		RemedyType:  remedy3,
	}
	db.Model(&Appoint{}).Create(&appoint3)

	// รายการบันทึกการจ่ายยา ------------------------------------------------------------------------------------------------------------
	MedRecord1 := MedRecord{
		Amount:         2,
		AdviceText:     "ทานเมื่อปวด ครั้งละ 1 เม็ด ทุก 4-6 ชม.",
		Datetime:       time.Now(),
		Treatment:      treatment1,
		Pharmacist:     pharmacist1,
		MedicalProduct: MedicalProduct2,
	}
	db.Model(&MedRecord{}).Create(&MedRecord1)

	MedRecord2 := MedRecord{
		Amount:         2,
		AdviceText:     "ทานเมื่อปวด ครั้งละ 1 เม็ด ทุก 4-6 ชม.",
		Datetime:       time.Now(),
		Treatment:      treatment2,
		Pharmacist:     pharmacist1,
		MedicalProduct: MedicalProduct1,
	}
	db.Model(&MedRecord{}).Create(&MedRecord2)

	MedRecord3 := MedRecord{
		Amount:         3,
		Treatment:      treatment3,
		AdviceText:     "ใช้ทำความสะอาดฟัน",
		Datetime:       time.Now(),
		Pharmacist:     pharmacist2,
		MedicalProduct: MedicalProduct3,
	}
	db.Model(&MedRecord{}).Create(&MedRecord3)

	// การชำระเงิน ------------------------------------------------------------------------------------------------
	Payment1 := Payment{
		Price:      2000.00,
		Pricetext:  "สองพันบาทถ้วน",
		Paytime:    time.Now(),
		Note:       "",
		Patient:    patient1,
		Financial:  financial1,
		RemedyType: remedy1,
	}
	db.Model(&Payment{}).Create(&Payment1)

	Payment2 := Payment{
		Price:      200.00,
		Pricetext:  "สองร้อยบาทถ้วน",
		Paytime:    time.Now(),
		Note:       "",
		Patient:    patient2,
		Financial:  financial1,
		RemedyType: remedy2,
	}
	db.Model(&Payment{}).Create(&Payment2)

	Payment3 := Payment{
		Price:      500.00,
		Pricetext:  "ห้าร้อยบาทถ้วน",
		Paytime:    time.Now(),
		Note:       "",
		Patient:    patient3,
		Financial:  financial1,
		RemedyType: remedy3,
	}
	db.Model(&Payment{}).Create(&Payment3)
}
