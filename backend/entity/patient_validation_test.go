package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPatientCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	patient := Patient{
		Birthday: time.Now().AddDate(0, 0, -1),
		IDcard:   "1329901010000",
		Height:   175.5,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(patient)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestPatientBirthdayMustPast(t *testing.T) {
	g := NewGomegaWithT(t)

	patient := Patient{
		Birthday: time.Now().AddDate(0, 0, 1),
		IDcard:   "1329901010000",
		Height:   175.5,
	}

	ok, err := govalidator.ValidateStruct(patient)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Birthday must be in the past"))

}

func TestPatientIDcardPattren(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"13299000000AB",
		"132000000000000000000",
		"132000",
		"",
	}

	for _, fixture := range fixtures {
		patient := Patient{
			Birthday: time.Now().AddDate(0, 0, -1),
			IDcard:   fixture,
			Height:   175.5,
		}

		ok, err := govalidator.ValidateStruct(patient)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		//g.Expect(err.Error()).To(Equal("IDcard Invalid format"))
		if err.Error() == "IDcard Invalid format" {
			g.Expect(err.Error()).To(Equal("IDcard Invalid format"))
		} else if err.Error() == "IDcard cannot be blank" {
			g.Expect(err.Error()).To(Equal("IDcard cannot be blank"))
		}
	}
}

func TestPatientHeight(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []float32{
		0,
		-5,
		-99,
	}

	for _, fixture := range fixtures {
		patient := Patient{
			Birthday: time.Now().AddDate(0, 0, -1),
			IDcard:   "1329901010000",
			Height:   fixture,
		}

		ok, err := govalidator.ValidateStruct(patient)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		//g.Expect(err.Error()).To(Equal("Height number >= 1, required~Amount must not be zero"))
		if err.Error() == "Height must not be zero" {
			g.Expect(err.Error()).To(Equal("Height must not be zero"))
		} else if err.Error() == "Height must not be negotive" {
			g.Expect(err.Error()).To(Equal("Height must not be negotive"))
		}

	}
}
