package entity

import (
	"time"

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
	Firstname string
	Lastname  string
	Birthday  time.Time
	IDcard    string `gorm:"uniqueIndex"`
	Tel       string
	Weight     float32
	Height    float32
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
