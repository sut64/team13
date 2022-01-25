package entity

import (
	"time"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

const password_cost = 14

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("SE-G13_dental_system.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Role{},
		&User{},
		&Treatment{},
		&Job{}, &Insurance{}, &Patient{}, &Sex{},
		&Payment{},
		&MedRecord{}, &MedicalProduct{},

	)

	db = database

	// ทดสอบเบื้องต้น
	// add new role
	dentist := addRole("Dentist")
	pharmacist := addRole("Pharmacist")
	Nurse := addRole("Nurse")
	Sex1 := addSex("ชาย")
	Sex2 := addSex("หญิง")
	Job1 := addJob("ราชการ")
	Job2 := addJob("รัฐวิสหกิจ")
	Job3 := addJob("นักศึกษา")
	Insurance1 := addInsurance("สิทธิสวัสดิการข้าราชการ","ข้าราชการและบคุคลในครอบครัวสามารถใช้สิทธิ์เบิกจ่ายตรง โดยใช้บัตรประชาชนในการเข้ารับบริการรักษาพยาบาลประเภทผู้ป่วยนอกทุกครั้ง ณ จุดชำระเงินโดยหากไม่ได้นำบัตรประชาชนมาแสดง หรือเอกสารที่กรมบัญชีกลางกำหนด ผู้รับบริการจะต้องสำรองจ่ายเงินค่ารักษาพยาบาลไปก่อน แล้วนำใบเสร็จรับเงินไปเบิกคืนกับส่วนราชการต้นสังกัด")
	Insurance2 := addInsurance("สิทธิประกันสังคม","สามารถใช้สิทธิ์ได้เฉพาะกรณีที่มีใบส่งตัวมาจากโรงพยาบาลต้นสังกัด และชำระเงินสดเท่านั้น ยกเว้น กรณีมีใบส่งตัวยืนยันการให้วางบิลโรงพยาบาลต้นสังกัดได้")
	Insurance3 := addInsurance("สิทธิหลักประกันสุขภาพ 30 บาท","คุ้มครองบุคคลที่เป็นคนไทยมีเลขประจำตัวประชาชน 13 หลักที่ไม่ได้รับสิทธิสวัสดิการข้าราชการ หรือ สิทธิประกันสังคม หรือสิทธิสวัสดิการรัฐวิสาหกิจ หรือสิทธิอื่น ๆ จากรัฐ")


	// add new user
	mydentist := addUser(
		User{
			Firstname: "ฟันดี", Lastname: "ฟันน้ำนม",
			Username: "yesimadoctor", Password: "1234",
		}, dentist)

	addUser(
		User{
			Firstname: "ฟันทน", Lastname: "คงนาน",
			Username: "notdoc", Password: "secret",
		}, pharmacist)

	

	// test for treatment with user entity
	treatment := Treatment{ToothNumber: 1, Dentist: mydentist}
	db.Create(&treatment)

	Nurse1 := addUser(
		User{
			Firstname: "พัชรชาติ", Lastname: "จิรศรีโสภา",
			Username: "few", Password: "1234",
		}, Nurse )

	addPatient(
		Patient{
			Firstname: "พัชรชาติ",
			Lastname:  "จิรศรีโสภา",
			Birthday:  time.Date(2009, 1, 1, 0, 0, 0, 0, time.UTC),
			IDcard:    "1329900000000",
			Tel:       "0902571569",
			Wight: 	   70,
			Height:	   175.0,
			Time:      time.Now(),
		}, Sex1 ,Job1 ,Insurance1 ,Nurse1)

	addPatient(
		Patient{
			Firstname: "นิตยา",
			Lastname:  "ไม่สุภาพ",
			Birthday:  time.Date(2010, 1, 1, 0, 0, 0, 0, time.UTC),
			IDcard:    "1329900000001",
			Tel:       "0902571569",
			Wight: 	   80.4,
			Height:	   165.6,
			Time:      time.Now(),
		}, Sex1 ,Job2 ,Insurance2,Nurse1 )
		
	addPatient(
		Patient{
			Firstname: "สมชาย",
			Lastname:  "สายชม",
			Birthday:  time.Date(2011, 1, 1, 0, 0, 0, 0, time.UTC),
			IDcard:    "1329900000020",
			Tel:       "0902571569",
			Wight: 	   70.6,
			Height:	   173.4,
			Time:      time.Now(),
		}, Sex2 ,Job3 ,Insurance3 ,Nurse1)

}

func addRole(name string) Role {
	role := Role{Name: name}
	db.Create(&role)
	return role
}

func addUser(user User, role Role) User {
	user.Role = role
	user.Password = hashPassword(user.Password)
	db.Create(&user)
	return user
}

func hashPassword(password string) string {
	result, _ := bcrypt.GenerateFromPassword([]byte(password), password_cost)
	return string(result)
}

func addSex(name string) Sex {
	sex := Sex{Name: name}
	db.Create(&sex)
	return sex
}

func addJob(name string) Job {
	job := Job{Name: name}
	db.Create(&job)
	return job
}

func addInsurance(name string,detail string) Insurance {
	insurance := Insurance{Name: name,Detail: detail}
	db.Create(&insurance)
	return insurance
}

func addPatient(patient Patient,sex Sex, job Job, insurance Insurance, nurse User) Patient{
	patient.Sex = sex
	patient.Job = job
	patient.Insurance = insurance
	patient.Nurse = nurse
	db.Create(&patient)
	return patient
}
