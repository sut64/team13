package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMedRecordPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	MedRecord := MedRecord{
		Amount:     1,
		AdviceText: "1 เม็ดหลังอาหาร",
		Datetime:   time.Now().Add(-20 * time.Hour),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(MedRecord)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}
func TestAdviceTextNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	MedRecord := MedRecord{
		Amount:     1,
		AdviceText: "",
		Datetime:   time.Now().Add(-20 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(MedRecord)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Advicetext cannot be blank"))
}

func TestDateTimeMustBeInThePast(t *testing.T) {
	g := NewGomegaWithT(t)
	MedRecord := MedRecord{
		Amount:     1,
		AdviceText: "1 เม็ดหลังอาหาร",
		Datetime:   time.Now().Add(24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(MedRecord)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Datetime must be in the past"))
}

func TestAmountNotLessThanZero(t *testing.T) {
	g := NewGomegaWithT(t)

	MedRecord := MedRecord{
		Amount:     -5,
		AdviceText: "1 เม็ดหลังอาหาร",
		Datetime:   time.Now().Add(-20 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(MedRecord)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Amount does not validate as positive"))
}

func TestAmountIncorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []int{
		-1, -2, -3, -4, -5, -6, -7, -8, -9,
	}
	for _, fixture := range fixtures {
		MedRecord := MedRecord{
			Amount:     fixture,
			AdviceText: "1 เม็ดหลังอาหาร",
			Datetime:   time.Now().Add(-20 * time.Hour),
		}
		ok, err := govalidator.ValidateStruct(MedRecord)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Amount does not validate as positive"))
	}
}
