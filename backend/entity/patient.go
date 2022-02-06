package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

//ระบบย่อย ระบบบันทึกเวชระเบียน
type Job struct {
	gorm.Model
	Name string

	Patients []Patient `gorm:"foreignKey:JobID"`
}

type Insurance struct {
	gorm.Model
	Name   string
	Detail string

	Patients []Patient `gorm:"foreignKey:InsuranceID"`
}

type Sex struct {
	gorm.Model
	Name string

	Patients []Patient `gorm:"foreignKey:SexID"`
}

type Patient struct {
	gorm.Model
	Firstname string    //`valid:"required~Firstname cannot be blank"`
	Lastname  string    //`valid:"required~Lastname cannot be blank"`
	Birthday  time.Time `valid:"past~Birthday must be in the past"`
	IDcard    string    `gorm:"uniqueIndex" valid:"matches(^\\d{13}$)~IDcard Invalid format,required~IDcard cannot be blank"`
	Tel       string    `valid:"matches(^\\d{10}$)~Tel Invalid format,required~Tel cannot be blank"`
	Weight    float32   `valid:"minamount~Weight must not be negotive, required~Weight must not be zero"`
	Height    float32   `valid:"minamount~Height must not be negotive, required~Height must not be zero"`
	Time      time.Time

	NurseID *uint
	Nurse   User

	JobID *uint
	Job   Job

	InsuranceID *uint
	Insurance   Insurance

	SexID *uint
	Sex   Sex

	Payments   []Payment   `gorm:"foreignKey:PatientID"`
	Appoints   []Appoint   `gorm:"foreignKey:PatientID"`
	Screenings []Screening `gorm:"foreignKey:PatientID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("minamount", func(i, o interface{}) bool {
		a := i.(float32)
		return a >= 1
	})

}
